import { Button } from '@/shared/components/atoms/button';
import { Input } from '@/shared/components/atoms/input';
import { Typography } from '@/shared/components/atoms/typography';

const HomePage = () => {
  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      {/* Buttons */}
      <section>
        <Typography variant="titleMedium">Buttons</Typography>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button size="small" variant="primary">적용</Button>
          <Button size="small" variant="secondary">닫기</Button>
          <Button size="small" variant="text">닫기</Button>
          <Button size="large" variant="primary">메일 쓰기</Button>
          <Button size="large" variant="secondary">메일 쓰기</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <Typography variant="titleMedium">Inputs</Typography>
        <div className="mt-4 flex flex-col gap-4 max-w-sm">
          <div>
            <Typography variant="body" bold>Default Input (h-40)</Typography>
            <Input placeholder="Default input" variant="default" size="medium" />
          </div>
          <div>
            <Typography variant="body" bold>Boxed Input (h-30)</Typography>
            <Input placeholder="Boxed input" variant="boxed" size="small" />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <Typography variant="titleMedium">Typography</Typography>
        <div className="mt-4 space-y-2">
          <Typography variant="titleLarge">23px Light – Title Large</Typography>
          <Typography variant="titleMedium">20px Light – Title Medium</Typography>
          <Typography variant="titleSmall">16px Light – Title Small</Typography>
          <Typography variant="body">14px Light – Body text</Typography>
          <Typography variant="caption">13px Medium – Caption (inactive info)</Typography>
          <Typography variant="body" bold>14px Bold – e.g. active tab</Typography>
        </div>
      </section>
    </div>
  );
};

export default HomePage;