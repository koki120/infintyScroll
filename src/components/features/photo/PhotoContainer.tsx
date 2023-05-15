import { PhotoPresenter } from "@/components/features/photo/PhotoPresenter";
import { useInfinityScroll } from "@/hooks/infintyScroll";
import { useListPhoto } from "@/hooks/injections";

export function PhotoContainer() {
  const infinityScrollHook = useInfinityScroll(useListPhoto());
  return (
    <PhotoPresenter
      photos={infinityScrollHook.ret}
      isLoading={infinityScrollHook.isLoading}
      hasFailed={infinityScrollHook.hasFailed}
      scrollTriggerRef={infinityScrollHook.scrollTriggerRef}
    />
  );
}
