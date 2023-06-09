import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

function withPageViews<P>(Component: React.ComponentType<P>): React.FC<P> {
  return function WithPageViews(props: P): JSX.Element {
    const createPageVisit = api.pageVisit.create.useMutation();
    const router = useRouter();

    useEffect(() => {
      const handleRouteChange = (url: string) => {
        try {
          createPageVisit.mutate({
            pageUrl: url,
          });
        } catch (error) {
          console.error(error);
        }
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, []);

    return <Component {...props} />;
  };
}

export default withPageViews;
