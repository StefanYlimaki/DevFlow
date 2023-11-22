"use client";

import { deleteAnswer, deleteQuestion } from "@/lib/actions/user.action";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "../ui/use-toast";

interface EditRemoveButtonsProps {
  contentType: string;
  contentId: string;
  contentOwnerClerkId: string;
}

const EditRemoveButtons = ({
  contentType,
  contentId,
  contentOwnerClerkId,
}: EditRemoveButtonsProps) => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = async () => {
    const payload = {
      id: JSON.parse(contentId),
      path: pathname,
    };

    let response;

    if (contentType === "question") response = await deleteQuestion(payload);

    if (contentType === "answer") response = await deleteAnswer(payload);

    toast({
      title: response?.message,
    });
  };

  return (
    <SignedIn>
      <Toaster />
      {userId === contentOwnerClerkId && (
        <div className="flex items-center justify-end gap-3 max-sm:w-full">
          {contentType === "question" && (
            <Image
              src="/assets/icons/edit.svg"
              alt="edit icon"
              width={14}
              height={14}
              onClick={handleEdit}
            />
          )}
          <Image
            src="/assets/icons/trash.svg"
            alt="remove-icon"
            width={14}
            height={14}
            onClick={handleDelete}
            className="cursor-pointer"
          />
        </div>
      )}
    </SignedIn>
  );
};

export default EditRemoveButtons;
