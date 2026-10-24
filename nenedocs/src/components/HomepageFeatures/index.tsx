import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const visualExplanation =
  'https://github.com/kwe26/neneui/raw/main/assets/visual_expl.png';

const FeatureList = [
  {
    title: 'TypeScript on the Server',
    description:
      'Define your UI on the server with TypeScript, enjoying type safety, familiar syntax, and editor autocomplete.',
    icon: '⌘',
  },
  {
    title: 'Native Flutter Rendering',
    description:
      'Describe your interface with NeneUI components and render it in Flutter applications.',
    icon: '◈',
  },
  {
    title: 'Declarative UI',
    description:
      'Build interfaces with components such as Text, Button, Column, and Scaffold.',
    icon: '◇',
  },
];

function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}): ReactNode {
  return (
    <div className={clsx('col col--4', styles.featureColumn)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} aria-hidden="true">
          {icon}
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.intro}>
          <span className={styles.eyebrow}>SERVER. DRIVEN.</span>
          <Heading as="h2">Build with NeneUI</Heading>
          <p>
            Define your UI with TypeScript and bring it to life through
            NeneUI's Flutter renderer.
          </p>
        </div>

        <div className={styles.visualSection}>
          <img
            src={visualExplanation}
            alt="NeneUI translating a TypeScript UI definition into a Flutter interface"
            className={styles.visualImage}
            loading="lazy"
          />
          <p className={styles.imageCaption}>
            From server-side component definitions to a rendered Flutter UI.
          </p>
        </div>

        <div className="row">
          {FeatureList.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>

        <div className={styles.testerSection}>
          <Heading as="h2">Test your @neneys/ui App Here!</Heading>
          <p>
            Explore the web tester in your browser or download the native
            tester from GitHub Releases. (* The Web Version cannot load localhost or apps with CORS enabled and HTTP Apps)
          </p>

          <div className={styles.testerActions}>
            <a
              className={clsx(
                'button button--primary button--lg',
                styles.actionButton,
              )}
              href="https://kwe26.github.io/neneui/tester/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Web Tester
            </a>

            <a
              className={clsx(
                'button button--secondary button--lg',
                styles.actionButton,
              )}
              href="https://github.com/kwe26/neneui/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Native Tester
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
