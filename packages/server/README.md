<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## 接口规范

- 创建使用PUT
- 删除使用Delete
- 更新使用Patch
- 获取单个使用Get
- 其他使用POST

1. GET 从服务器获取资源。用于请求数据而不对数据进行更改。例如，从服务器获取网页、图片等。
2. POST 向服务器发送数据以创建新资源。常用于提交表单数据或上传文件。发送的数据包含在请求体中。
3. PUT 向服务器发送数据以更新现有资源。如果资源不存在，则创建新的资源。与 POST 不同，PUT 通常是幂等的，即多次执行相同的 PUT 请求不会产生不同的结果。
4. DELETE 从服务器删除指定的资源。请求中包含要删除的资源标识符。
5. PATCH 对资源进行部分修改。与 PUT 类似，但 PATCH 只更改部分数据而不是替换整个资源。
6. HEAD 类似于 GET，但服务器只返回响应的头部，不返回实际数据。用于检查资源的元数据（例如，检查资源是否存在，查看响应的头部信息）。
7. OPTIONS 返回服务器支持的 HTTP 方法。用于检查服务器支持哪些请求方法，通常用于跨域资源共享（CORS）的预检请求。
8. TRACE 回显服务器收到的请求，主要用于诊断。客户端可以查看请求在服务器中的处理路径。
9. CONNECT 建立一个到服务器的隧道，通常用于 HTTPS 连接。客户端可以通过该隧道发送加密的数据。

## 依赖库

[nestjs](https://docs.nestjs.com/)
[nestjs中文](https://nest.nodejs.cn/)

[lodash(中文)](https://lodash.com/)
[lodash(英文官网)](https://lodash.com/)

[nestia(英文官网)](https://nestia.io/docs/)
> Nestia是一个用于NestJS的辅助库，它提供了一组扩展的fs（文件系统）方法，用于处理文件和目录，如复制、移动、删除等。

[fs-extra](https://github.com/jprichardson/node-fs-extra)
> fs-extra是一个用于Node.js的库，它提供了一组扩展的fs（文件系统）方法，用于处理文件和目录，如复制、移动、删除等。

## MongoDB

https://cloud.mongodb.com/v2/631ad9b60d593a53deaf11ed#/clusters/detail/bab

> Nestia is a set of helper libraries for NestJS, supporting below features:

## DefaultExceptionType 默认异常处理类型

1. BadRequestException
   状态码: 400
   含义: 请求无效，服务器无法理解请求的语法。
   使用场景: 当客户端发送了无效请求（如参数丢失或格式错误）。
2. UnauthorizedException
   状态码: 401
   含义: 请求未经授权，客户端必须进行身份验证才能访问所请求的资源。
   使用场景: 客户端未提供有效的身份凭证以访问受保护资源。
3. NotFoundException
   状态码: 404
   含义: 请求的资源未找到，服务器无法找到客户端请求的 URL。
   使用场景: 当用户请求的资源在服务器上不存在时，例如 URL 错误。
4. ForbiddenException
   状态码: 403
   含义: 服务器理解请求，但拒绝执行该请求，通常是由于权限限制。
   使用场景: 当用户请求的资源存在但没有权限访问时。
5. NotAcceptableException
   状态码: 406
   含义: 服务器无法生成客户端所请求的内容类型。
   使用场景: 客户端请求特定内容类型，但是服务器无法生成该类型的响应。
6. RequestTimeoutException
   状态码: 408
   含义: 服务器在等待客户端请求时超时。
   使用场景: 客户端未在服务器预期的时间内发送完整请求数据。
7. ConflictException
   状态码: 409
   含义: 请求由于冲突而无法完成，通常是资源状态的冲突。
   使用场景: 通常在尝试添加或更新资源时，发生数据冲突（如版本冲突）。
8. GoneException
   状态码: 410
   含义: 请求的资源已被永久删除，且不再可用。
   使用场景: 用户请求的资源不再可用，并且没有替代的资源。
9. HttpVersionNotSupportedException
   状态码: 505
   含义: 服务器不支持请求中使用的 HTTP 协议版本。
   使用场景: 客户端请求一个不被服务器支持的 HTTP 版本。
10. PayloadTooLargeException
    状态码: 413
    含义: 请求的有效负载过大，无法被服务器处理。
    使用场景: 当用户上传的文件或数据超过服务器允许的大小限制时。
11. UnsupportedMediaTypeException
    状态码: 415
    含义: 请求中提交的数据类型不被支持。
    使用场景: 客户端发送的数据格式（如 Content-Type 头）与服务器期望的格式不匹配。
12. UnprocessableEntityException
    状态码: 422
    含义: 请求格式正确，但由于语义错误无法满足请求。
    使用场景: 通常在 RESTful API 中，当请求数据不满足业务逻辑时，比如验证失败。
13. InternalServerErrorException
    状态码: 500
    含义: 服务器发生错误，无法完成请求。
    使用场景: 当意外错误发生时，例如代码中的未捕获异常。
14. NotImplementedException
    状态码: 501
    含义: 服务器不支持执行请求所需要的功能。
    使用场景: 当请求的功能在服务器上未实现时。
15. ImATeapotException
    状态码: 418
    含义: 服务器拒绝执行此请求，因为它是一个茶壶。
    使用场景: 最初是为了一种幽默的用途而引入的，作为 April Fools' Day 的玩笑，通常在指定不支持的 HTTP 方法时使用。
16. MethodNotAllowedException
    状态码: 405
    含义: 指定的请求方法不被允许。
    使用场景: 当客户端使用不支持的 HTTP 方法（如 PUT 对于只允许 GET 的资源）时。
17. BadGatewayException
    状态码: 502
    含义: 作为网关或代理的服务器，收到无效响应。
    使用场景: 通常用于服务器端的错误，发生在反向代理或负载均衡器前端。
18. ServiceUnavailableException
    状态码: 503
    含义: 服务器当前无法处理请求，可能是由于临时超载或停机维护。
    使用场景: 用于表示服务器当前不可用，通常由维护或过载引起。
19. GatewayTimeoutException
    状态码: 504
    含义: 作为网关或代理的服务器未能及时从上游服务器获取请求。
    使用场景: 通常在请求到上游服务器超时时使用。
20. PreconditionFailed
    状态码: 412
    含义: 由于请求中指定的条件未满足，导致请求失败。
    使用场景: 通常用于请求头（如 If-Match）包含
