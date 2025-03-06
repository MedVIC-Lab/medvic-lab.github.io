import { members } from './store';
import { Members } from './types';


/**
 * Checks if all member categories are empty.
 *
 * @returns {boolean} True if all member categories (researchers, phdStudents, msStudents, undergradStudents, staff, alumni) are empty, otherwise false.
 */
export function membersIsEmpty() {
  return members.value.researchers.length === 0 &&
    members.value.phdStudents.length === 0 &&
    members.value.msStudents.length === 0 &&
    members.value.undergradStudents.length === 0 &&
    members.value.staff.length === 0 &&
    members.value.alumni.length === 0;
}

/**
 * Asynchronously retrieves the list of members.
 * If the members list is empty, it loads the members from a JSON file.
 * 
 * NOTE: This should be called onMount of a page that uses the members list to ensure that the members are loaded before rendering.
 *
 * @returns {Promise<any>} A promise that resolves to the list of members.
 */
export async function getMembers() {
  if (membersIsEmpty()) {
    await loadPeopleJSON();
  }

  return members.value;
}

/**
 * Retrieves a member by their role.
 *
 * @param role - The role of the member to retrieve.
 * @returns A promise that resolves to the member with the specified role.
 */
export async function getMemberByRole(role: string) {
  return getMembers()[role];
}

/**
 * Retrieves a member object by their name from the members collection.
 *
 * @param name - The name of the member to search for.
 * @returns The member object if found, otherwise `null`.
 */
export function getMemberByName(name: string) {
  for (const role of Object.values(members.value)) {
    for (const member of role) {
      if (member.name.trim().toLowerCase() === name.trim().toLowerCase()) {
        return member;
      }
    }
  }

  return null;
}

/**
 * Checks if the given author is present in the members list.
 *
 * @param author - The name of the author to check.
 * @returns `true` if the author is found in the members list, otherwise `false`.
 */
export function isAuthorInMembers(author: string) {
  // for every role, check if the array contains author
  for (const role of Object.values(members.value)) {
    for (const member of role) {
      if (member.name.trim().toLowerCase() === author.trim().toLowerCase()) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Loads the members data from a JSON file and categorizes them into different roles.
 * 
 * @returns {Promise<Members>} A promise that resolves to an object containing categorized members.
 * 
 * @example
 * ```typescript
 * loadPeopleJSON().then(members => {
 *   console.log(members.researchers); // Array of researchers
 * });
 * ```
 * 
 * @throws {Error} If there is an issue with fetching or parsing the JSON data.
 */
export async function loadPeopleJSON() {
  const tempMembers: Members = {
    researchers: [],
    phdStudents: [],
    msStudents: [],
    undergradStudents: [],
    staff: [],
    alumni: []
  }

  const response = await fetch('/assets/members.json')
  const data = await response.json()

  data.forEach(member => {
    switch (member.role.toLowerCase()) {
      case 'researcher':
        tempMembers.researchers.push(member)
        break
      case 'phd student':
        tempMembers.phdStudents.push(member)
        break
      case 'ms student':
        tempMembers.msStudents.push(member)
        break
      case 'staff':
        tempMembers.staff.push(member)
        break
      case 'alumni':
        tempMembers.alumni.push(member)
        break
      default:
        break
    }
  })

  members.value = tempMembers;

  return tempMembers;
}