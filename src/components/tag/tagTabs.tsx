import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TagNotes } from "./tagNotes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const TagTabs = () => {
  return (
    <Tabs defaultValue="details" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="interactions">Interactions</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>View and Edit Tag Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notes">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>View and Search Tag Notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TagNotes />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="interactions">
        <Card>
          <CardHeader>
            <CardTitle>Interactions</CardTitle>
            <CardDescription>View and Search Tag Interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current notes</Label>
              <Input id="current" type="notes" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New notes</Label>
              <Input id="new" type="notes" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
