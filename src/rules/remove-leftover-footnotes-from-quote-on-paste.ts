// based on https://github.com/chrisgrieser/obsidian-smarter-paste/blob/master/clipboardModification.ts#L15
import {Options, RuleType} from '../rules';
import RuleBuilder, {ExampleBuilder, OptionBuilderBase} from './rule-builder';
import dedent from 'ts-dedent';

class RemoveLeftoverFootnotesFromQuoteOnPasteOptions implements Options {
}

@RuleBuilder.register
export default class RemoveLeftoverFootnotesFromQuoteOnPaste extends RuleBuilder<RemoveLeftoverFootnotesFromQuoteOnPasteOptions> {
  get OptionsClass(): new () => RemoveLeftoverFootnotesFromQuoteOnPasteOptions {
    return RemoveLeftoverFootnotesFromQuoteOnPasteOptions;
  }
  get name(): string {
    return 'Remove Leftover Footnotes from Quote on Paste';
  }
  get description(): string {
    return 'Removes any leftover footnote references for the text to paste';
  }
  get type(): RuleType {
    return RuleType.PASTE;
  }
  apply(text: string, options: RemoveLeftoverFootnotesFromQuoteOnPasteOptions): string {
    return text.replace(/(\D)[.,]\d+/g, '$1');
  }
  get exampleBuilders(): ExampleBuilder<RemoveLeftoverFootnotesFromQuoteOnPasteOptions>[] {
    return [
      new ExampleBuilder({
        description: 'Footnote reference removed',
        before: dedent`
          He was sure that he would get off without doing any time, but the cops had other plans.50
          ${''}
          _Note that the format for footnote references to move is a dot or comma followed by any number of digits_
        `,
        after: dedent`
          He was sure that he would get off without doing any time, but the cops had other plans
          ${''}
          _Note that the format for footnote references to move is a dot or comma followed by any number of digits_
        `,
      }),
    ];
  }
  get optionBuilders(): OptionBuilderBase<RemoveLeftoverFootnotesFromQuoteOnPasteOptions>[] {
    return [];
  }
}
