interface ISidebarList {
  /** Array of recent tv series names */
  items: string[];
  /** Callback when clicking on the name of the tv series which will run a query for that item */
  onClick: (str: string) => void;
  /** Callback when clicking on the "x" icon which will delete that item from the list */
  onDelete: (str: string) => void;
}

export type { ISidebarList };
