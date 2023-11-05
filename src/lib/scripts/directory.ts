export class FileSystem {
    root: { type: string; name: string; content: { home: { type: string; name: string; content: { user: { type: string; name: string; content: any }; }; }; }; };
    currentNode: { type: string; name: string; content: { home: { type: string; name: string; content: { user: { type: string; name: string; content: any }; }; }; }; };
    constructor() {
        this.root = {
            type: "directory",
            name: "/",
            content: {
                home: {
                    type: "directory",
                    name: "home",
                    content: {
                        user: {
                            type: "directory",
                            name: "user",
                            content: {
                                file1: { type: "file", name: "file1", data: "File1 content" },
                                file2: { type: "file", name: "file2", data: "File2 content" },
                            },
                        },
                    },
                },
            },
        };
        this.currentNode = this.root;
    }

    navigateToPath(path: string) {
        path = this.getCurrentPath() != path ? this.getCurrentPath() + "/" + path : path
        const pathArray = path.split("/").filter((p) => p);
        let currentNode: any = this.root;

        for (let i = 0; i < pathArray.length; i++) {
            const item = pathArray[i];
            if (item === "..") {
                currentNode = this.getParent(currentNode.name) || currentNode;
            } else if (currentNode?.content[item]?.type == 'file') {
                return "Cannot cd into a file";
            } else if (currentNode?.content[item]) {
                currentNode = currentNode.content[item];
            } else {
                return "Path not found";
            }
        }

        this.currentNode = currentNode;
        return "Navigated to " + this.getCurrentPath();
    }

    getCurrentPath() {
        let currentNode = this.currentNode;
        let path = "";

        while (currentNode !== this.root) {
            path = "/" + currentNode.name + path;
            currentNode = this.getParent(currentNode.name);
        }

        return path || "/";
    }

    listPathContent() {
        if (this.currentNode.type === "file") {
            return "Cannot list content of a file";
        }

        const content = Object.values(this.currentNode.content);
        const contentNames = content.map((item) => item.name);
        return contentNames.join(", ");
    }

    getParent(name: string) {
        const searchNode: any = (node: any) => {
            if (node.content) {
                for (const key in node.content) {
                    if (node.content[key].name === name) {
                        return node;
                    } else {
                        const result = searchNode(node.content[key]);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return null;
        };

        return searchNode(this.root);
    }

    getFileData(filename: string) {
        if (this.currentNode.type === "file") {
          return "Cannot get data from a file inside another file";
        }
    
        //@ts-ignore
        const fileNode = this.currentNode.content[filename];
        if (!fileNode || fileNode.type !== "file") {
          return "File not found or not a file";
        }
    
        return fileNode.data;
    }
}

export function extractPathFromCd(input: string): string {
    const regex = /^cd\s+(.+)/;
    const match = input.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return "";
}