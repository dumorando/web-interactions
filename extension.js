//We dont need to wrap it in a function cause the builder does that for us
// Boilerplate from https://docs.penguinmod.com

class Extension {
	constructor() {
		this.enabled = false;
		window.addEventListener("beforeunload", (e) => {
			if (this.enabled) e.preventDefault();
		});
	}

    getInfo() {
        return {
            id: "webinteractions",
            name: "Web Interactions",
			"color1": "#57e389",
                "color2": "#26a269",
            blocks: [
                {
                    opcode: 'alert',
                    text: 'show message [MESSAGE]',
                    blockType: Scratch.BlockType.COMMAND,
					arguments: {
						MESSAGE: {
							type: Scratch.ArgumentType.STRING
						}
					}
                },
				{
					opcode: 'prompt',
					text: 'ask for input with message [MESSAGE]',
					blockType: Scratch.BlockType.REPORTER,
					arguments: {
						MESSAGE: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				{
					opcode: 'confirm',
					text: 'true or false with message [MESSAGE]',
					blockType: Scratch.BlockType.BOOLEAN,
					arguments: {
						MESSAGE: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				'---',
				{
					opcode: 'closetabconfirm',
					text: 'set close tab confirmation to [OPTION]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						OPTION: {
							type: Scratch.ArgumentType.STRING,
							menu: "option"
						}
					}
				},
				{
					opcode: 'getclosetabconfirm',
					text: 'close tab confirmation enabled?',
					blockType: Scratch.BlockType.BOOLEAN
				},
				'---',
				{
					opcode: 'fullscreen',
					text: 'set fullscreen to [OPTION]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						OPTION: {
							type: Scratch.ArgumentType.STRING,
							menu: 'option'
						}
					}
				},
				{
					opcode: 'infullscreen',
					text: 'in fullscreen?',
					blockType: Scratch.BlockType.BOOLEAN
				}
            ],
			menus: {
				option: {
					acceptReporters: true,
					items: [
						{
							text: 'enabled',
							value: 'true'
						},
						{
							text: 'disabled',
							value: 'false'
						}
					]
				}
			}
        };
    }

    alert(args) {
        alert(args.MESSAGE);
    }

	prompt(args) {
		return prompt(args.MESSAGE);
	}

	confirm(args) {
		return confirm(args.MESSAGE);
	}

	closetabconfirm(args) {
		this.enabled = Scratch.Cast.toBoolean(args.OPTION);
	}

	getclosetabconfirm() {
		return this.enabled;
	}

	fullscreen(args) {
		if (Scratch.Cast.toBoolean(args.OPTION)) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}

	infullscreen() {
		return document.fullscreenElement !== null;
	}
}

Scratch.extensions.register(new Extension());