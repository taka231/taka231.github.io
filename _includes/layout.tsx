import BaseLayout from "./base-layout.tsx";

export default (data: Lume.Data, filters: Lume.Helpers) => {
  const { title, children } = data;

  return (
    <BaseLayout title={title} pageType="home">
      {children}
    </BaseLayout>
  );
};
