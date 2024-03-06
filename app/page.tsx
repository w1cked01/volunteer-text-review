import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Image from "next/image";
async function getUser() {
  try {
    const data = await fetch("http://api.sarika.hischoolkh.com/get_users", {
      next: { revalidate: 1 },
    });
    const json = await data.json();
    return json;
  } catch (error) {
    throw new Error("Somthing went wrong");
  }
}

export default async function Home() {
  const user = await getUser();

  return (
    <div className="container p-10">
      <div className="w-full mb-10">
        <h1 className="text-xl font-bold uppercase">
          click on your name to review the text corpus that assigned to you
        </h1>
      </div>
      <div className="space-y-2">
        {user.user.map((user: any) => {
          return (
            <Card key={user[0]}>
              <Link href={`/${user[0]}`}>
                <CardBody>
                  <p>{user[1]}</p>
                </CardBody>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
