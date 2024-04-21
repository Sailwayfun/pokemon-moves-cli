export interface ListInquiry {
  type: "list";
  name: "moveName";
  message: "Choose one move to look up the details";
  choices: string[];
}