import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <div>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Taverna do Barik</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <Button>Entrar</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Home;
