import Style from './template.module.css';
import { ReactNode } from 'react';

export interface IChildren {
    children: ReactNode | ReactNode[];
}

export default function Template({ children }: IChildren) {
  return (
    <section className={Style.template}>
      <div className={Style.login_template}>
        { children }
      </div>
    </section>
  );
}