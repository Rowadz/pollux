// TODO:: I CAN MAP THE WHOLE FAKER LIB TO THIS!!
// TODO:: AND GENERATE ALL THE FUNCTIONS AS A DRAG AND DROP
export const map = new Map([
  ['UUID', { groupName: 'random', func: 'uuid', propName: 'id' }],
  ['Email', { groupName: 'internet', func: 'email', propName: 'email' }],
  ['REGEX', { groupName: 'regex', func: 'regex', propName: 'REGEX' }],
  [
    'Password',
    { groupName: 'internet', func: 'password', propName: 'password' },
  ],
  ['Full Name', { groupName: 'name', func: 'fullName', propName: 'name' }],
  [
    'Paragraphs',
    { groupName: 'lorem', func: 'paragraphs', propName: 'paragraphs' },
  ],
  [
    'Paragraph',
    { groupName: 'lorem', func: 'paragraph', propName: 'paragraph' },
  ],
  ['IP', { groupName: 'internet', func: 'ip', propName: 'ip' }],
  ['Image', { groupName: 'random', func: 'image', propName: 'image' }],
])
