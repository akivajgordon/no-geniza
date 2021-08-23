import noGeniza from './no-geniza'

it('replaces Elo-him with א-להים', () => {
  expect(noGeniza('בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃'))
    .toEqual('בְּרֵאשִׁ֖ית בָּרָ֣א אֱ-לֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃')
})

it('replaces tetragram with ה׳', () => {
  expect(noGeniza('ויעש נח ככל אשר־צוהו יהוה')).toEqual('ויעש נח ככל אשר־צוהו ה׳')
})

it('replaces tetragram (& nikkud) with ה׳', () => {
  expect(noGeniza('וַיַּ֖עַשׂ נֹ֑חַ כְּכֹ֥ל אֲשֶׁר־צִוָּ֖הוּ יְהֹוָֽה׃')).toEqual('וַיַּ֖עַשׂ נֹ֑חַ כְּכֹ֥ל אֲשֶׁר־צִוָּ֖הוּ ה׳׃')
})
