import { useContext, useEffect, useState } from "react";
import { AuthContext } from "shared/contexts";

export const useFindRecipient = (members) => {
  const { user } = useContext(AuthContext);

  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    if (members) {
      const member = members.find((m) => m._id !== user._id);

      if (member) {
        setRecipient(member);
      }
    }
  }, [members]);

  return recipient;
};
