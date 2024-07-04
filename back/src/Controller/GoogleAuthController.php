<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\RedirectResponse;
use League\OAuth2\Client\Exception\HostedDomainException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class GoogleAuthController extends AbstractController
{
    private $entityManager;
    private $userRepository;
    private $jwtManager;
    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, JWTTokenManagerInterface $jwtManager)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->jwtManager = $jwtManager;
    }

    /**
     * Link to this controller to start the "connect" process
     */
    #[Route('/connect/google', name: 'connect_google_start')]
    public function connectAction(ClientRegistry $clientRegistry)
    {
        // will redirect to Google!
        return $clientRegistry
            ->getClient('google') // key used in config/packages/knpu_oauth2_client.yaml
            ->redirect([
                'openid', 'profile', 'email' // the scopes you want to access
            ], ['prompt' => 'select_account']);
    }

    /**
     * After going to Google, you're redirected back here
     * because this is the "redirect_route" you configured
     * in config/packages/knpu_oauth2_client.yaml
     */
    #[Route('/connect/google/check', name: 'connect_google_check')]
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry)
    {

        /** @var \KnpU\OAuth2ClientBundle\Client\Provider\Google $client */
        $client = $clientRegistry->getClient('google');
        $frontendUrl = 'http://localhost:5173/callback';
        try {
            // the exact class depends on which provider you're using
            /** @var \League\OAuth2\Client\Provider\GoogleUser $googleUser */
            $googleUser = $client->fetchUser();

            $user = $this->userRepository->findOneBy(['googleId' => $googleUser->getId()]);
            // $googlename = $googleUser->getName();
            // dd($googleUser);

            if (!$user) {
                $user = (new User())->setGoogleId($googleUser->getId());
                $user->setEmail($googleUser->getEmail());
                $user->setName($googleUser->getName());
                $this->entityManager->persist($user);
                $this->entityManager->flush();
            }
            
            
            $token = $this->jwtManager->create($user);
            // dd($googleUser, $user,$token);
            return new RedirectResponse(sprintf('%s?token=%s', $frontendUrl, $token), Response::HTTP_FOUND);
        } catch (IdentityProviderException $e) {
            return new RedirectResponse(sprintf('%s?error=%s', $frontendUrl, urlencode($e->getMessage())), Response::HTTP_SEE_OTHER);
        } catch (HostedDomainException $hde) {
            return new RedirectResponse(sprintf('%s?error=%s', $frontendUrl, urlencode($hde->getMessage())), Response::HTTP_SEE_OTHER);
        }
    }
}
