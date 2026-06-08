import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button, type ButtonVariant } from "./Button";
import { Icon } from "./icons";

/**
 * Primary conversion CTA. Replace with the official Google Play badge asset
 * before launch (brand guidelines); this is a styled stand-in for the prototype.
 */
export function GooglePlayBadge({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <Button href={siteConfig.playStoreUrl} variant={variant} className={cn("px-5", className)}>
      <Icon name="play" className="size-5" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.6rem] font-normal opacity-80">GET IT ON</span>
        <span className="text-sm font-semibold">Google Play</span>
      </span>
    </Button>
  );
}
