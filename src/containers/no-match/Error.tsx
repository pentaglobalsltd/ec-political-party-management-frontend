import { ROUTES } from '@constants/routes';
import { Button, Text } from '@pentabd/ui';

function Error() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-20 gap-8 vh-100">
      <Text> Something went wrong</Text>
      <Button
        type="primary"
        fill="outline"
        onClick={() => window.location.replace(ROUTES.HOME)}
      >
        Go to Home
      </Button>
    </div>
  );
}

export default Error;
