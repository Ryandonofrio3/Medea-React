export interface ParsedContent {
    text: string;
    thinking: string | null;
    followUpQuestions: string[];
  }
  
  export function parseXMLContent(content: string): ParsedContent {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(`<root>${content}</root>`, 'text/xml');
  
    const result: ParsedContent = {
      text: '',
      thinking: null,
      followUpQuestions: [],
    };
  
    // Extract main text
    const textNodes = xmlDoc.evaluate('//text()[not(parent::thinking) and not(parent::follow_up_question)]', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0; i < textNodes.snapshotLength; i++) {
      result.text += textNodes.snapshotItem(i)?.textContent || '';
    }
  
    // Extract thinking content
    const thinkingNode = xmlDoc.querySelector('thinking');
    if (thinkingNode) {
      result.thinking = thinkingNode.textContent || null;
    }
  
    // Extract follow-up questions
    const followUpQuestions = xmlDoc.querySelectorAll('follow_up_question');
    followUpQuestions.forEach(question => {
      if (question.textContent) {
        result.followUpQuestions.push(question.textContent);
      }
    });
  
    return result;
  }