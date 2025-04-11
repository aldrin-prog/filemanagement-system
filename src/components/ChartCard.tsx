import { ChartCardProps } from "@/utils/propsInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const ChartCard = ({ title, description, children }: ChartCardProps) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">{children}</CardContent>
    </Card>
  );
export default ChartCard;