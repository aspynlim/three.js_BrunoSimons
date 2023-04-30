# three.js_BrunoSimons

- How to generate a `SSH-key` & add it to GitHub
  * `ssh-keygen -t rsa -C` [e-mail address]
  * Copy it the info that shows up after entering `cat ~/.ssh/id_rsa.pub` ([Reference](https://www.techrepublic.com/article/how-to-view-your-ssh-keys-in-linux-macos-and-windows/))
    - The key should start with `ssh-rsa`
  * Add it to GitHub: Settings > SSH and GPG keys > SSH Keys

- Run a local server
  * `npm i` (`npm install`) in terminal
  * `npm run dev` in terminal

- Go live with Vercel
  * `npm i` (`npm install`) in terminal
  * add `"deploy": "vercel --prod"` in package.json
  * `npm i vercel` in terminal
  * `npm run build` in terminal

- Projects on live
  * Ch 1-13. 3D Text: https://webgl-3d-text-nu-rose.vercel.app  

- [Changing a commit message](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message)