import Style from './template.module.css';

interface ITemplate {
  children: React.ReactNode;
}

export default function Template({ children }: ITemplate) {
  return (
    <main className={Style.template}>
      <header className={Style.header}>
        <h1>IChat</h1>
      </header>
      <section className={Style.section}>
        <div className={Style.content}>
          <h2>IChat</h2>
          { children }
        </div>
      </section>
    </main>
  );
}