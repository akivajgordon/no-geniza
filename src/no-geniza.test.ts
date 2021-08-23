import noGeniza from './no-geniza'

it('replaces tetragram with ה׳', () => {
  expect(noGeniza('ויעש נח ככל אשר־צוהו יהוה')).toEqual('ויעש נח ככל אשר־צוהו ה׳')
})

it('replaces tetragram (& nikkud) with ה׳', () => {
  expect(noGeniza('וַיַּ֖עַשׂ נֹ֑חַ כְּכֹ֥ל אֲשֶׁר־צִוָּ֖הוּ יְהֹוָֽה׃')).toEqual('וַיַּ֖עַשׂ נֹ֑חַ כְּכֹ֥ל אֲשֶׁר־צִוָּ֖הוּ ה׳׃')
})
