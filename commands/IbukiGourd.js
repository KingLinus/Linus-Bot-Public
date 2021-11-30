module.exports = {
	name: 'IbukiGourd',
    description: 'ibuki gourd',
    aliases: ['ibuki gourd', 'ibukigourd', 'Ibuki gourd', 'Ibuki Gourd'],
	execute(message) {
        return message.channel.send('Ibuki Gourd is a system card (out of the three: spells, skills and system) that can be activated standing on the ground while first in your hand if you are not attacking or enduring blockstun/hitstun. Before diving into the activation mechanics of the effect in question: "Draw an additional 2 cards from your deck", be aware that drawing is the act of filling up 1 card of meter in the 5 slots of your hand. Meter is gained primarily by attacking with bullets and melee, and once one meter slot has reached maximum capacity, you will then be granted a random card out of the twenty (excluding the cards already used/drawn in the match) in your deck. When Ibuki Gourd is used, the system instantly draws one card and begins to further fill your card meter until 2 cards are drawn. You are free to move after the meter gain effect is resolved, and Ibuki Gourd is unable to be used again during the match unless you have multiple copies (up to 4 total) of it. The meter fill will be interrupted if you are hit, and you will only keep the meter gained up until that moment of impact. Once you have access to the 2 new cards of your deck currently in your hand, you may use those cards as freely and immediately as you wish, just as if you had drawn them through the other various, but more common, means of meter gain. It should be noted that if you have five cards in your hand while activating Ibuki Gourd, it can only fill the hand slot that was occupied by itself, thereby only granting you 1 card instead of the 2 suggested in the description.In conclusion, Ibuki Gourd is a circumstantial item to put in your deck that might only be optimized with specific strategies that require heavy drawing power to be effective, such as the Okuu\'s infamous "Double Sun". If quicker access to game changing spells or maxed skills is not mandatory to the playstyle, often times preserving that space in your deck for more reliable cards is a safer option than this niche system card.');
    },
};