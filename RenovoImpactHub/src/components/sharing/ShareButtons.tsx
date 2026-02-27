'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface ShareButtonsProps {
  shareUrl: string;
  shareText: string;
}

export default function ShareButtons({ shareUrl, shareText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  }

  function handleLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  }

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareText, url: shareUrl });
      } catch {
        // User cancelled or share failed, fall back to copy
        await handleCopy();
      }
    } else {
      await handleCopy();
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" size="sm" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
      <Button variant="secondary" size="sm" onClick={handleTwitter}>
        Share on Twitter
      </Button>
      <Button variant="secondary" size="sm" onClick={handleLinkedIn}>
        Share on LinkedIn
      </Button>
      <Button variant="secondary" size="sm" onClick={handleShare}>
        Share
      </Button>
    </div>
  );
}
