'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { cn } from '../../lib/cn';
import { mergeRefs } from '../../lib/merge-refs';
import { type ComponentProps, useRef } from 'react';
import { useTOCItems, TocThumb } from './index';
import * as Primitive from 'fumadocs-core/toc';

export function TOCItems({ ref, className, ...props }: ComponentProps<'div'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();
  const { text } = useI18n();

  if (items.length === 0)
    return (
      <div className="rounded-lg border bg-fd-card p-3 text-xs text-fd-muted-foreground">
        {text.tocNoHeadings}
      </div>
    );

  return (
    <>
      <TocThumb
        containerRef={containerRef}
        className="absolute top-(--fd-top) h-(--fd-height) w-1 bg-fd-primary rounded-full transition-all"
      />
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn(
          'relative flex flex-col border-l border-fd-border/60 ps-3 gap-1',
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <TOCItem key={item.url} item={item} />
        ))}
      </div>
    </>
  );
}

function TOCItem({ item }: { item: Primitive.TOCItemType }) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        'text-sm text-fd-muted-foreground transition-colors duration-200 hover:text-fd-foreground data-[active=true]:text-fd-primary data-[active=true]:font-medium block py-1 leading-relaxed break-words',
        item.depth === 2 && 'ps-0 text-sm',
        item.depth === 3 && 'ps-4 text-sm',
        item.depth === 4 && 'ps-8 text-xs',
        item.depth >= 5 && 'ps-12 text-xs',
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}
