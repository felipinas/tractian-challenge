import { Asset, LocationI } from "../services/company";

type Item = LocationI | Asset;

export enum ItemType {
  Location = "LOCATION",
  Asset = "ASSET",
  Component = "COMPONENT",
}

export type NestedItem = {
  id: string;
  name: string;
  parentId: string | null;
  type: ItemType;
  children: NestedItem[];
};

export const formatAssets = ({
  locations,
  assets,
}: {
  locations: LocationI[];
  assets: Asset[];
}) => {
  const allItems: Item[] = [...locations, ...assets];
  const itemMap = new Map<string, NestedItem>();
  const rootNodes: NestedItem[] = [];

  allItems.forEach((item) => {
    const type =
      "sensorType" in item && item.sensorType
        ? ItemType.Component
        : "locationId" in item
        ? ItemType.Asset
        : ItemType.Location;

    itemMap.set(item.id, {
      ...item,
      type,
      children: [],
    });
  });

  allItems.forEach((item) => {
    const currentItem = itemMap.get(item.id)!;

    const hasItemParent = Boolean(item.parentId);
    if (hasItemParent) {
      const parent = itemMap.get(item.parentId);

      if (parent) {
        parent.children.push(currentItem);
        return;
      }
    }

    const hasLocation = "locationId" in item && item.locationId;
    if (hasLocation) {
      const parentLocation = itemMap.get(item.locationId);

      if (parentLocation) {
        parentLocation.children.push(currentItem);
        return;
      }
    }

    rootNodes.push(currentItem);
  });

  return rootNodes;
};
