import React from 'react';
import cn from 'classnames';

import { useLocales } from 'localization';
import { getLinkFromEmail, getLinkFromPhone } from 'utils/maps';

import Section from 'components/Section';
import Icon, { IconProp } from 'components/Icon';
import Transition from 'components/Transition';

import references from 'data/references';

import s from './styles.module.scss';

type RowProps = {
  icon: IconProp;
  text?: string;
  link?: {
    href: string;
    text: string;
  };
};

const Row: React.FC<RowProps> = ({ icon, text, link }) => (
  <li className={cn('row', s.row)}>
    <Icon icon={icon} set="solid" className={s.rowIcon} />
    <div className="grow1">
      {link ? (
        <a href={link.href} target="_blank" rel="noreferrer">
          {link.text}
        </a>
      ) : (
        <Transition text={text} />
      )}
    </div>
  </li>
);

type Props = {
  className?: string;
};

export default ({ className }: Props) => {
  const { t, l } = useLocales('sections.references');
  return (
    <Section
      icon="thumbs-up"
      title={t('title')}
      align="center"
      className={cn(s.root, className)}
      contentClassName={s.content}
    >
      {references.map(({ name, position, company, phone, email }, index) => (
        <div key={`reference-${index.toString()}`} className={s.reference}>
          <Transition text={l(name)} className={s.name} />
          <ul>
            <Row icon="briefcase" text={l(position)} />
            <Row icon="building" text={l(company)} />
            <Row
              icon="phone"
              link={{ text: phone, href: getLinkFromPhone(phone) }}
            />
            {/* <Row
              icon="envelope"
              link={{ text: email, href: getLinkFromEmail(email) }}
            /> */}
          </ul>
        </div>
      ))}
    </Section>
  );
};
