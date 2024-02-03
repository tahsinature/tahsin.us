import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyAvatar = () => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src="https://github.com/tahsinature.png" />
      <AvatarFallback>MT</AvatarFallback>
    </Avatar>
  );
};

export default MyAvatar;
