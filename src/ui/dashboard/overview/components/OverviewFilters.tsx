"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SelectComponent } from '../../components/SelectComponent';
import { Card } from '@/tremorComponents/Card';
import { Button } from '@/tremorComponents/Button';
// import { useDebouncedCallback } from 'use-debounce';

export function SelectCityFilter({ data, defaultValue, disabled }: {
  data: {
    value: string;
    label: string;
  }[],
  defaultValue?: string,
  disabled?: boolean | undefined
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams!);
    params.set('city', '');

    if (term) {
      params.set('city', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // useEffect(() => { }, [defaultValue])

  return (
    <div className="w-full md:max-w-40"          >
      <SelectComponent
        disabled={disabled}
        {...{ data, placeholder: "Select City" }}
        OnValueChange={handleSearch}
        value={defaultValue}
      />
    </div>
  )
}

export function SelectYearFilter({ data, defaultValue, disabled }: {
  data: {
    value: string;
    label: string;
  }[],
  defaultValue?: string,
  disabled?: boolean | undefined
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams!);
    params.set('year', '');

    if (term) {
      params.set('year', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // useEffect(() => { }, [defaultValue])

  return (
    <div className="w-full md:max-w-40">
      <SelectComponent
        disabled={disabled}
        {...{ data, placeholder: "Select Year" }}
        OnValueChange={handleSearch}
        value={defaultValue}
      />
    </div>
  )
}

export function SelectBranchFilter({ data, defaultValue }: {
  data: {
    value: string;
    label: string;
  }[],
  defaultValue?: string
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams!);
    params.set('branch_id', '');

    if (term) {
      params.set('branch_id', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // useEffect(() => { }, [defaultValue])

  return (
    <div className="w-full md:max-w-40"          >
      <SelectComponent
        {...{ data, placeholder: "Select Branch" }}
        OnValueChange={handleSearch}
        value={defaultValue}
      />
    </div>
  )
}

export function ResetFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const resetSearch = () => {
    const params = new URLSearchParams(searchParams!);

    params.delete('year');
    params.delete('city');
    params.delete('branch_id');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full md:max-w-40" >
      <Button
        variant='secondary'
        onClick={() => resetSearch()}
      >
        Reset Filters
      </Button>
    </div>
  )
}
