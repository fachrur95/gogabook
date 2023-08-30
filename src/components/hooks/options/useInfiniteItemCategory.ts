import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { IDataOption } from "@/types/options";
import type { IMasterItemCategory } from "@/types/masters/masterItem/masterItemCategory";
import type { InfiniteQueryResult } from "@/types/api-response";

const useInfiniteItemCategory = () => {
  const [options, setOptions] = useState<IDataOption[]>([]);
  const [countAll, setCountAll] = useState<number>(0);
  const { data } = api.masterItemCategory.getAll.useInfiniteQuery({ limit: 15 },
    {
      getNextPageParam: (lastPage: InfiniteQueryResult<IMasterItemCategory>) =>
        typeof lastPage.currentPage === "number" && options.length < countAll
          ? (lastPage.currentPage ?? 0) + 1
          : undefined,
    });

  useEffect(() => {
    if (data) {
      const dataOptions: IDataOption[] = data?.pages
        .map((page) =>
          page.result.map((row: IMasterItemCategory) => ({ id: row.id, label: row.masteritemcategory_description }))
        )
        .flat();
      const dataCountAll: number = data.pages[0]?.countAll ?? 0;
      setOptions(dataOptions);
      setCountAll(dataCountAll);
    }
  }, [data]);

  return { options };
};

export default useInfiniteItemCategory;
