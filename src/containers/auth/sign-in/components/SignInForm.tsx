import Form from './Form';

export const SignInForm = () => {
  return (
    <div className="d-grid grid-cols-12 vh-100 position-relative">
      {/* 1 */}
      <div className="col-span-6 col-span-lg-6  col-span-sm-12">
        <img src="/election.png" alt="election" />
      </div>

      {/* 2 */}
      <div className="col-span-6 col-span-lg-6  col-span-sm-12 bg-white d-flex flex-column align-items-center">
        {/* main form */}
        <div className="w-100 d-flex flex-column justify-content-center flex-1">
          <div className="d-flex justify-content-center flex-column gap-9 align-items-center">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};
