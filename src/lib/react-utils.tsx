import { FC, PropsWithChildren } from 'react';

export const composeProviders = (providers: FC<PropsWithChildren>[]) =>
  providers.reduce(
    (Acc, Provider) =>
      ({ children }) =>
        Acc ? (
          <Acc>
            <Provider>{children}</Provider>
          </Acc>
        ) : (
          <Provider>{children}</Provider>
        ),
  );
