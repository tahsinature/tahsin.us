import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyAvatar = () => {
  return (
    <Avatar className="border-solid border-2  duration-1000 hover:border-gray-400 border-transparent">
      <AvatarImage src="https://github.com/tahsinature.png" />
      <AvatarFallback>MT</AvatarFallback>
    </Avatar>
  );
};

export default MyAvatar;
