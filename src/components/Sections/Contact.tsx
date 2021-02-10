import React from "react";
import { FlexBoxSection } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { valueIsArray, valueIsLinkInfo } from "../Utils";

interface IContactProps {
  refObj: React.MutableRefObject<any>;
  links: ISectionInfo;
}
export const Contact = (props: IContactProps) => {
  const { links, refObj } = props;
  return (
    <FlexBoxSection
      justifyContent="center"
      alignItems="center"
      className="profile-section links"
      id="links"
      ref={refObj}
    >
      {valueIsArray(links.info) && valueIsLinkInfo(links.info)
        ? links.info.map((link) => (
            <a
              className="link"
              href={link.link}
              target="_blank"
              key={link.label}
              rel="noopener noreferrer"
            >
              <img alt={link.label} className={link.label} src={link.icon} />
            </a>
          ))
        : null}
    </FlexBoxSection>
  );
};
