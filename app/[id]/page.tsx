import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import ListDetail from "./_component/list-detail";

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  // const userDetail = await getUserDetail(params.id);

  return (
    <div className="container p-10">
      <ListDetail userId={params.id} />
    </div>
  );
};

export default UserDetailPage;
