import { Plugin } from "obsidian"

export default class FocusMode extends Plugin {
    leftSidebarWasCollapsed: boolean
    rightSidebarWasCollapsed: boolean

    sidebarIsOpen() {
        return (
            !this.app.workspace.leftSplit.collapsed ||
            !this.app.workspace.rightSplit.collapsed
        )
    }

    collapseSidebars() {
        this.leftSidebarWasCollapsed = this.app.workspace.leftSplit.collapsed
        this.rightSidebarWasCollapsed = this.app.workspace.rightSplit.collapsed

        this.app.workspace.leftSplit.collapse()
        this.app.workspace.rightSplit.collapse()
    }

    restoreSidebars() {
        if (!this.leftSidebarWasCollapsed) {
            this.app.workspace.leftSplit.expand()
        }

        if (!this.rightSidebarWasCollapsed) {
            this.app.workspace.rightSplit.expand()
        }
    }

    toggleSidebars() {
        if (this.sidebarIsOpen()) {
            this.collapseSidebars()
        } else {
            this.restoreSidebars()
        }
    }

    async onload() {
        console.log("loading sidebar toggle plugin ...")

        this.addCommand({
            id: "toggle-sidebars",
            name: "Toggle Sidebars",
            callback: () => {
                this.toggleSidebars()
            },
        })
    }

    onunload() {
        console.log("unloading sidebar toggle plugin ...")
    }
}
