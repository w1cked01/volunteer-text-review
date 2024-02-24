import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";


const getUserDetail = async (userId: string) => {
  try {
    const user = await fetch(
      `http://api.sarika.hischoolkh.com/get_texts_by_user/${userId}`
    );
    return user.json();
  } catch (error) {
    throw new Error("Somthing went wrong");
  }
};

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  const userDetail = await getUserDetail(params.id);

  return (
    <div className="space-y-2">
      {userDetail.data.map((detail: any) => {
        return (
          <Card key={detail[0]}>
              <CardBody>
                <p>{detail[1]}</p>
              </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default UserDetailPage;
