import { FC } from "react";

type IPage = {
  url: string;
  layout?: string;
  actions?: string[];
  component: FC<{ layout: any & { ready: boolean; render: () => void } }>;
};

export const page = (opt: IPage) => {
  return opt;
};
