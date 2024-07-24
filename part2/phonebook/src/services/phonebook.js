import axios from "axios";

export async function getPhonebook() {
  const promise = axios({
    method: "get",
    url: "http://localhost:3001/persons",
  });

  return promise;
}

export async function addPersonToPhonebook(person) {
  let messageType = "";
  let messageContent = "";
  try {
    const addPersonResponse = await axios({
      method: "post",
      url: "http://localhost:3001/persons",
      data: {
        ...person,
      },
    });

    const wasPersonAdded = addPersonResponse.data;
    addPersonResponse.statusText;

    if (wasPersonAdded) {
      messageType = "success";
      messageContent = "Added " + person.name;
      return;
    }

    console.log("Person is not found !");

    throw new Error("Person not found!");
  } catch (err) {
    console.log(err);
    messageType = "error";
    messageContent = "Person has already been deleted from server!";
  } finally {
    return {
      messageType,
      messageContent,
    };
  }
}

export async function updatePersonFromPhonebook(person) {
  let messageType = "";
  let messageContent = "";

  try {
    const updatePersonResponse = await axios({
      method: "put",
      url: "http://localhost:3001/persons/" + person.id,
      data: {
        ...person,
      },
    });

    const updatedPerson = updatePersonResponse.data;

    if (updatedPerson) {
      messageType = "success";
      messageContent = "Updated " + updatedPerson.name;
      return;
    }

    throw new Error();
  } catch (err) {
    messageType = "error";
    messageContent = `Information of ${person.name} has already been removed from server!`;
  } finally {
    return {
      messageType,
      messageContent,
    };
  }
}

export async function deletePersonFromPhonebook(personId) {
  let messageType = "";
  let messageContent = "";
  try {
    const deletePersonResponse = await axios({
      method: "delete",
      url: "http://localhost:3001/persons/" + personId,
    });

    const deletedPerson = deletePersonResponse.data;

    if (deletedPerson) {
      messageType = "success";
      messageContent = "Deleted " + deletedPerson.name;
      return;
    }

    throw new Error(deletePersonResponse.data);
  } catch (err) {
    messageType = "error";
    messageContent = err.message;
  } finally {
    return {
      messageType,
      messageContent,
    };
  }
}
