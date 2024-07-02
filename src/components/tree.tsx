import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { companyService } from "../services/company";

import { formatAssets, ItemType, NestedItem } from "../utils/formatAssets";

import locationIcon from "../assets/icons/location.svg";
import assetIcon from "../assets/icons/asset.svg";
import componentIcon from "../assets/icons/component.svg";

function Entry({ entry, depth }: { entry: NestedItem; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const icon = {
    [ItemType.Location]: locationIcon,
    [ItemType.Asset]: assetIcon,
    [ItemType.Component]: componentIcon,
  }[entry.type];

  return (
    <div>
      <div
        className="flex gap-2"
        onClick={() => setIsExpanded((state) => !state)}
      >
        {entry.children?.length > 0 && (isExpanded ? "v" : ">")}
        <img src={icon} />
        {entry.name} - {entry.type}
      </div>

      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 30}px` }}>
          {entry.children?.map((entry) => {
            return <Entry entry={entry} depth={depth + 1} />;
          })}
        </div>
      )}
    </div>
  );
}

export function Tree() {
  const { id: companyId } = useParams();

  const { data: locations } = useQuery({
    queryKey: ["/locations", companyId],
    queryFn: () => companyService.getLocations({ companyId: companyId || "" }),
  });

  const { data: assets } = useQuery({
    queryKey: ["/assets", companyId],
    queryFn: () => companyService.getAssets({ companyId: companyId || "" }),
  });

  const formattedAssets = useMemo(() => {
    if (locations && assets) {
      return formatAssets({ locations, assets });
    }
  }, [locations, assets]);

  if (!formattedAssets) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-h-full">
      {formattedAssets.map((asset) => {
        return <Entry entry={asset} depth={1} />;
      })}
    </div>
  );
}
