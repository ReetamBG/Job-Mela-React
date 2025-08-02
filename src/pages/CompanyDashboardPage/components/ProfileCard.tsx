import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileCard() {
    return (
        <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback>NY</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">Nil Yeager</h3>
                        <p className="text-sm text-muted-foreground">View Profile</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto bg-gradient-primary text-white border-0">
                        50
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground mb-2">
                        Your Profile is complete for 50%
                    </p>
                    <Progress value={50} className="h-3 bg-muted" />
                    <div className="h-3 bg-gradient-primary rounded-full w-1/2 absolute top-0 left-0" />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Next: Add your Experience</span>
                    <Button size="sm">
                        Finish Your Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}