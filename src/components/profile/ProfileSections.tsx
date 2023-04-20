import React from "react";
import styled from "styled-components";
import { FlexBox, SectionsWrapper } from "../../common/Elements";
import { AppContext } from "../../store/profile/context";
import { Experiences } from "./Sections/Experiences";
import { Skills } from "./Sections/Skills";
import { About } from "./Sections/About";
import { Education } from "./Sections/Education";
import { Contact } from "./Sections/Contact";
import classNames from "classnames";
import { Organizations } from "./Sections/Organizations";
import { ResumeExperiences } from "./Sections/ResumeExperiences";
import { SECTION_ORDER } from "../../common/constants";

interface IProfileSectionsProps {
  exportProfile?: () => void;
}
const ProfileSections = (props: IProfileSectionsProps) => {
  const {
    isExport = false,
    isMobile,
    isInstallBannerOpen,
    data: { sections, header },
    refs: {
      homeRef,
      skillsRef,
      experienceRef,
      educationRef,
      contactRef,
      orgRef,
    },
  } = React.useContext(AppContext);
  const {
    aboutMe,
    details,
    skills,
    education,
    experience,
    links,
    organizations,
  } = sections;
  const { shortDesc, name } = header;
  const { ABOUT, EDUCATION, ORGANIZATIONS, SKILLS, EXPERIENCES, CONTACT } =
    SECTION_ORDER;

  const AboutComp = (
    <About
      aboutMe={aboutMe}
      links={links}
      details={details}
      refObj={homeRef}
      exportProfile={() => {
        if (props.exportProfile) {
          props.exportProfile();
        }
      }}
    />
  );

  const EducationComp = (
    <Education
      isExport={isExport}
      education={education}
      refObj={educationRef}
    />
  );

  const OrganizationsComp = (
    <>
      {!isExport && (
        <Organizations
          isExport={isExport}
          isMobile={isMobile}
          organizations={organizations}
          refObj={orgRef}
        />
      )}
    </>
  );

  const SkillsComp = (
    <Skills isExport={isExport} skills={skills} refObj={skillsRef} />
  );

  const ExperiencesComp = (
    <>
      {isExport ? (
        <ResumeExperiences />
      ) : (
        <Experiences
          isExport={isExport}
          experiences={experience}
          refObj={experienceRef}
        />
      )}
    </>
  );

  const ContactComp = (
    <>{!isExport && <Contact links={links} refObj={contactRef} />}</>
  );

  const sectionComponents = [
    {
      order: ABOUT,
      name: "about",
      component: AboutComp,
    },
    {
      order: EDUCATION,
      name: "education",
      component: EducationComp,
    },
    {
      order: ORGANIZATIONS,
      name: "organizations",
      component: OrganizationsComp,
    },
    {
      order: SKILLS,
      name: "skills",
      component: SkillsComp,
    },
    {
      order: EXPERIENCES,
      name: "experiences",
      component: ExperiencesComp,
    },
    {
      order: CONTACT,
      name: "contact",
      component: ContactComp,
    },
  ];

  const reOrderedSectionComponents = sectionComponents.sort(
    (a, b) => a.order - b.order
  );

  const HorizontalSep = () => (
    <hr className={classNames("header-sep", { export: isExport })} />
  );

  return (
    <Wrapper
      className={classNames({
        export: isExport,
        "add-margin-top": !isMobile && isInstallBannerOpen,
        "add-margin-bottom": isMobile && isInstallBannerOpen,
      })}
    >
      {!isExport && <ShortDesc>{shortDesc}</ShortDesc>}
      <PageHeader>
        <HorizontalSep />
        <span>{name}</span>
        <HorizontalSep />
      </PageHeader>
      <FlexBox direction="column" alignItems="center">
        <Separator className={classNames({ export: isExport })} />
      </FlexBox>
      <SectionsWrapper
        isMobile={isMobile}
        isExport={isExport}
        className={classNames({ export: isExport })}
      >
        {reOrderedSectionComponents.map((section, index) => (
          <div key={index}>{section.component}</div>
        ))}
      </SectionsWrapper>
    </Wrapper>
  );
};

export default ProfileSections;

const Wrapper = styled.section`
  &:not(.export) {
    background-color: #f0f0f0;
    &.add-margin-top {
      margin-top: 90px;
      animation: ease-in-m-t 2s ease-in 1;
      @keyframes ease-in-m-t {
        from {
          margin-top: 0;
        }
        to {
          margin-top: 90px;
        }
      }
    }
    &.add-margin-bottom {
      margin-bottom: 90px;
      animation: ease-in-m-b 2s ease-in 1;
      @keyframes ease-in-m-b {
        from {
          margin-bottom: 0;
        }
        to {
          margin-bottom: 90px;
        }
      }
    }
  }

  .header-sep {
    min-width: 100px;
    opacity: 0.6;
    height: 0;
    border-top: 5px solid #22a39f;
    margin: 0 10px;
    &.export {
      display: none;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
`;

const Separator = styled.hr`
  min-width: 50%;
  border-color: #727878;
  opacity: 0.2;
  height: 0;
  border-top: 1px solid #eee;
  &.export {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ShortDesc = styled.h3`
  text-align: center;
  color: #727878;
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 0;
  line-height: 3;
  font-style: italic;
  @media screen and (max-width: 767px) {
    padding-top: 75px;
    margin: 0;
  }
`;
const PageHeader = styled.h2`
  font-size: 45px;
  font-weight: 500;
  color: #22a39f;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    font-size: 36px;
  }
`;
