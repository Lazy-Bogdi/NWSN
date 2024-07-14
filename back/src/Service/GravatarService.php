<?php

namespace App\Service;

class GravatarService
{
    public function getGravatarUrl(
        string $email,
        int $size = 64,
        string $defaultImageType = 'retro',
        bool $forceDefault = false,
        string $rating = 'g'
    ): string {
        // Prepare parameters
        $params = [
            's' => $size,
            'd' => $defaultImageType,
            'r' => $rating,
        ];
        if ($forceDefault) {
            $params['f'] = 'y';
        }

        // Generate URL
        $baseUrl = 'https://www.gravatar.com/avatar';
        $hash = md5(strtolower(trim($email)));
        $query = http_build_query($params);
        $url = sprintf('%s/%s?%s', $baseUrl, $hash, $query);

        return $url;
    }
}
