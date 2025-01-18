'use client';

import { cx } from '@/lib/utils';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder, className }: { placeholder: string, className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const handleSearch = useDebouncedCallback((term) => {
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative w-full min-w-64">
      <input
        type='search'
        className={cx("peer block w-full rounded-md bg-white dark:bg-gray-950 dark:text-white text-gray-950 border border-gray-300 dark:border-gray-800 py-3 px-4 text-sm outline-2 outline-primary/40 placeholder:text-gray-500", className)}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams?.get('query')?.toString()}
      />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}
