<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('api/post', name: 'api_post')]
class PostController extends AbstractController
{
    private $postRepository;
    private $entityManager;
    private $security;

    public function __construct(PostRepository $postRepository, EntityManagerInterface $entityManager, Security $security)
    {
        $this->postRepository = $postRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    #[Route('/posts', name: 'get_posts', methods: 'GET')]
    public function getPosts(): JsonResponse
    {
        $posts = $this->postRepository->findBy([], ['createdAt' => 'DESC']);
        $data = [];

        foreach ($posts as $post) {
            $data[] = [
                'id' => $post->getId(),
                'content' => $post->getContent(),
                'author' => $post->getAuthor()->getName(), // Assuming the User entity has a getUsername method
                'gravatarUrl' => $post->getAuthor()->getGravatarUrl(), // Assuming the User entity has a getAvatar method
                'created_at' => $post->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/posts', name: 'add_post', methods: 'POST')]
    public function addPost(Request $request): JsonResponse
    {

        $user = $this->security->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $content = $data['content'] ?? null;
        if (!$content) {
            return new JsonResponse(['error' => 'Content is required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $post = new Post();
        $post->setContent($content);
        $post->setAuthor($user);
        $post->setCreatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($post);
        $this->entityManager->flush();

        $response = [
            'id' => $post->getId(),
            'content' => $post->getContent(),
            'author' => $post->getAuthor()->getName(),
            'gravatarUrl' => $post->getAuthor()->getGravatarUrl(), // Assuming the User entity has a getAvatar method
            'created_at' => $post->getCreatedAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($response, JsonResponse::HTTP_CREATED);
    }
}
