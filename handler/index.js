//creating a djs handler for commands and events
//we gonna set all the commands in a collection

const glob = require("glob");
const { Client } = require("discord.js");
const { promisify } = require("util");
const fs = require("fs");
const globPromise = promisify(glob);
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  const commandfiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  //we gonna explain this line by line
  commandfiles.map((value) => {
    //we gonna use the require method to require the command file
    const file = require(value);
    //we gonna use the split method to split the path of the file
    const splitted = value.split("/");
    //we gonna use the pop method to remove the last element of the array
    const directory = splitted[splitted.length - 2];
    //we gonna use the set method to set the command in the collection but first we gonna check if the command has a name or aliases


    if (file.name) {

      const properties = { directory, ...file };
      //we gonna use the set method to set the command in the collection
      client.commands.set(file.name, properties);
    }
    if (file.aliases) {
    //
      const properties = { directory, ...file };
      //we gonna use the set method to set the command in the collection
      client.commands.set(file.aliases, properties);
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
  eventFiles.map((value) => require(value));

    
};
