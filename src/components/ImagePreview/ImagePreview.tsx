"use client";

import React, { useState } from "react";
import { HeartIcon, X } from "lucide-react";
import { AnimatedCounter } from "react-animated-counter";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, Image, Divider } from "@nextui-org/react";

import { Image as ImageType } from "@/types";

export default function ImagePreview({ image, onModalClose }: { image: ImageType; onModalClose: (image: ImageType) => void }) {
  const [likeCount, setLikeCount] = useState(image.likeCount || 0);

  const close = () => {
    onModalClose({ ...image, likeCount });
  };

  return (
    <Modal size={"lg"} backdrop="blur" isOpen={true} onClose={close} closeButton={<></>} defaultOpen className="">
      <ModalContent>
        <ModalBody className="p-6 overflow-hidden max-h-[80vh]">
          <Image width={image.width} height={image.height} alt={image.caption} src={image.src} />
        </ModalBody>
        <ModalFooter className="flex gap-4 items-center w-full justify-between pb-7">
          <Button isIconOnly color="danger" aria-label="Like" onClick={() => setLikeCount(likeCount + 1)}>
            <HeartIcon />
          </Button>
          <Divider orientation="vertical" />
          <div className="text-[#333] dark:text-[#fff]">
            <AnimatedCounter value={likeCount} decimalPrecision={0} color="inherit" fontSize="20px" />
          </div>
          <Divider orientation="vertical" />
          <Button isIconOnly color="default" aria-label="Like" onClick={close}>
            <X />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
