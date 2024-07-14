<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

final class JWTCreatedListener
{
    #[AsEventListener(event: JWTCreatedEvent::class)]
    public function onJWTCreatedEvent(JWTCreatedEvent $event): void
    {
        /** @var UserInterface $user */
        $user = $event->getUser();
        $payload = $event->getData();

        // Add custom data to the JWT payload
        // $payload['email'] = $user->getEmail();
        $payload['name'] = $user->getName();
        $payload['gravatarUrl'] = $user->getGravatarUrl(); // Add other custom fields as neededU
        // dd($payload);
        // Set the modified payload back to the event
        $event->setData($payload);
    }
}
