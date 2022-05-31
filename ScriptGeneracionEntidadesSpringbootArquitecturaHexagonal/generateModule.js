const fs = require('fs');
const moduleName = process.argv.slice(2)[0];
const microserviceLowerCase = process.argv.slice(2)[1];
const moduleNameLowerCase = moduleName.toLowerCase();
const moduleNameToCamelCase = camelize(moduleName);
const moduleNameToUpperSnakeCase = moduleNameToCamelCase.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

//fs.rmdirSync(`./${moduleNameToCamelCase}`, {recursive: true});
fs.mkdirSync(`./${moduleNameToCamelCase}`);
fs.mkdirSync(`./${moduleNameToCamelCase}/application`);
fs.mkdirSync(`./${moduleNameToCamelCase}/application/port`);
fs.mkdirSync(`./${moduleNameToCamelCase}/domain`);
fs.mkdirSync(`./${moduleNameToCamelCase}/domain/noDatabase`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller/dto`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller/dto/input`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller/dto/output`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/repository`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/repository/port`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/repository/jpa`);


fs.writeFileSync(`./${moduleNameToCamelCase}/application/port/Create${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};

public interface Create${moduleName}Port {
    ${moduleName} create(Save${moduleName} save${moduleName}) throws Exception;
}
`);

fs.writeFileSync(`./${moduleNameToCamelCase}/application/port/Update${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};

public interface Update${moduleName}Port {
    ${moduleName} update(String id, Save${moduleName} save${moduleName}) throws Exception;
}
`);

fs.writeFileSync(`./${moduleNameToCamelCase}/application/port/Update${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};

public interface Update${moduleName}Port {
    ${moduleName} update(String id, Save${moduleName} save${moduleName}) throws Exception;
}
`);


fs.writeFileSync(`./${moduleNameToCamelCase}/application/Create${moduleName}UseCase.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port;


import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port.Create${moduleName}Port;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Save${moduleName}Port;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class Create${moduleName}UseCase implements Create${moduleName}Port {

  private Save${moduleName}Port save${moduleName}Port;

  @Override
  public ${moduleName} create(Save${moduleName} save${moduleName})
      throws Exception {
    ${moduleName} ${moduleNameToCamelCase} = new ${moduleName}();
    ${moduleNameToCamelCase}.update(save${moduleName});
    return save${moduleName}Port.save(new Save${moduleName}(${moduleNameToCamelCase}));
  }
}
`);

fs.writeFileSync(`./${moduleNameToCamelCase}/application/Update${moduleName}UseCase.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port.Update${moduleName}Port;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Save${moduleName}Port;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Find${moduleName}Port;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class Update${moduleName}UseCase implements Update${moduleName}Port {

  private Save${moduleName}Port save${moduleName}Port;
  private Find${moduleName}Port find${moduleName}Port;

  @Override
  public ${moduleName} update(String id, Save${moduleName} save${moduleName})
      throws Exception {
    ${moduleName} ${moduleNameToCamelCase} = find${moduleName}Port.findById(id);
    ${moduleNameToCamelCase}.update(save${moduleName});
    return save${moduleName}Port.save(new Save${moduleName}(${moduleNameToCamelCase}));
  }
}
`);

fs.writeFileSync(`./${moduleNameToCamelCase}/domain/noDatabase/Save${moduleName}.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.shared.ObjectUtil;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class Save${moduleName} extends ${moduleName} {

  public Save${moduleName}(${moduleName} ${moduleNameToCamelCase}) {
    updateAll(${moduleNameToCamelCase});
  }

  public void updateAll(${moduleName} ${moduleNameToCamelCase}) {
    ObjectUtil.copyProperties(${moduleNameToCamelCase}, this, new String[] {});
  }
}
`);


fs.writeFileSync(`./${moduleNameToCamelCase}/domain/noDatabase/Search${moduleName}.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Search${moduleName} extends ${moduleName} {

}
`);


fs.writeFileSync(`./${moduleNameToCamelCase}/domain/${moduleName}.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain;

import com.bosonit.staffit.shared.Auditable;
import com.bosonit.staffit.shared.ObjectUtil;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ${moduleName} extends Auditable<String> {

  private String id;

  private ${moduleName}Jpa ${moduleNameToCamelCase}Jpa;

  public ${moduleName}(${moduleName}Jpa ${moduleNameToCamelCase}Jpa) {
    if (${moduleNameToCamelCase}Jpa == null) return;
    this.${moduleNameToCamelCase}Jpa = ${moduleNameToCamelCase}Jpa;

    this.setCreatedBy(${moduleNameToCamelCase}Jpa.getCreatedBy());
    this.setCreatedDate(${moduleNameToCamelCase}Jpa.getCreatedDate());
    this.setLastModifiedBy(${moduleNameToCamelCase}Jpa.getLastModifiedBy());
    this.setLastModifiedDate(${moduleNameToCamelCase}Jpa.getLastModifiedDate());

    this.setId(${moduleNameToCamelCase}Jpa.getId());
  }

  public void update(${moduleName} ${moduleNameToCamelCase}) {
    ObjectUtil.copyProperties(
        ${moduleNameToCamelCase},
        this,
        new String[] {"id", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate"});
  }
}
`);


fs.writeFileSync(`./${moduleNameToCamelCase}/domain/${moduleName}Jpa.java`, `
package com.bosonit.staffit.${moduleNameLowerCase}.content.${moduleNameToCamelCase}.domain;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName}Jpa;
import com.bosonit.staffit.shared.Auditable;
import com.bosonit.staffit.shared.sequences.StringPrefixedSequenceIdGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MSTR_${moduleNameToUpperSnakeCase}")
public class ${moduleName}Jpa extends Auditable<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "${moduleNameToUpperSnakeCase}_SEQ")
  @GenericGenerator(
      name = "${moduleNameToUpperSnakeCase}_SEQ",
      strategy = "com.bosonit.staffit.shared.sequences.StringPrefixedSequenceIdGenerator",
      parameters = {
        @org.hibernate.annotations.Parameter(
            name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM,
            value = "1"),
        @org.hibernate.annotations.Parameter(
            name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER,
            value = "${moduleName.toUpperCase().substring(0, 3)}"),
        @org.hibernate.annotations.Parameter(
            name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER,
            value = "%08d")
      })
  @Column(name = "ID_${moduleNameToUpperSnakeCase}")
  private String id;

  public ${moduleName}Jpa(${moduleName} ${moduleNameToCamelCase}) {
    if (${moduleNameToCamelCase} == null) return;

    this.setCreatedBy(${moduleNameToCamelCase}.getCreatedBy());
    this.setCreatedDate(${moduleNameToCamelCase}.getCreatedDate());
    this.setLastModifiedBy(${moduleNameToCamelCase}.getLastModifiedBy());
    this.setLastModifiedDate(${moduleNameToCamelCase}.getLastModifiedDate());

    this.setId(${moduleNameToCamelCase}.getId());
  }
}
`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/input/${moduleName}InputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class ${moduleName}InputDTO {


    public Save${moduleName} ${moduleNameToCamelCase}(Save${moduleName} save${moduleName}) {
        return save${moduleName};
    }
}

`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/input/Search${moduleName}InputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.GroupSearch${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import lombok.*;


@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Search${moduleName}InputDTO {
    private String id;

    public Search${moduleName} search${moduleName}(){
        Search${moduleName} search${moduleName} = new Search${moduleName}();

        search${moduleName}.setId(this.getId());

        return search${moduleName};
    }
}
`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/input/GroupSearch${moduleName}InputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import com.bosonit.staffit.shared.dto.GroupSearchInputDTO;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class GroupSearch${moduleName}InputDTO
    extends GroupSearchInputDTO<Search${moduleName}InputDTO> {}

`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/output/${moduleName}OutputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ${moduleName}OutputDTO extends Simple${moduleName}OutputDTO
    implements Serializable {

  public ${moduleName}OutputDTO(${moduleName} ${moduleNameToCamelCase}) {
    super(${moduleNameToCamelCase});
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/output/Simple${moduleName}OutputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class Simple${moduleName}OutputDTO implements Serializable {
  protected String id;

  public Simple${moduleName}OutputDTO(${moduleName} ${moduleNameToCamelCase}) {
    this.setId(${moduleNameToCamelCase}.getId());
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/Create${moduleName}Controller.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port.Create${moduleName}Port;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.Simple${moduleName}OutputDTO;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@Api(tags = "${moduleName}", description = "${moduleName} endpoints")
@RequestMapping("api/v0/${moduleNameToCamelCase}s")
public class Create${moduleName}Controller {

  private Create${moduleName}Port create${moduleName}Port;

  @PostMapping
  @Transactional(rollbackFor = Exception.class)
  public Simple${moduleName}OutputDTO create(
      @RequestParam(name = "style", defaultValue = "full") String style,
      @RequestBody ${moduleName}InputDTO ${moduleNameToCamelCase}InputDTO)
      throws Exception {
    Save${moduleName} save${moduleName} =
        ${moduleNameToCamelCase}InputDTO.${moduleNameToCamelCase}(new Save${moduleName}());
    ${moduleName} created${moduleName} =
        create${moduleName}Port.create(save${moduleName});
    return getDTO(created${moduleName}, style);
  }

  private Simple${moduleName}OutputDTO getDTO(${moduleName} ${moduleNameToCamelCase}, String style) {
    return style.equals("simple")
        ? new Simple${moduleName}OutputDTO(${moduleNameToCamelCase})
        : new ${moduleName}OutputDTO(${moduleNameToCamelCase});
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/Delete${moduleName}Controller.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Delete${moduleName}Port;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@Api(tags = "${moduleName}", description = "${moduleName} endpoints")
@RequestMapping("api/v0/${moduleNameToCamelCase}s")
public class Delete${moduleName}Controller {

  private Delete${moduleName}Port delete${moduleName}Port;

  @ResponseStatus(HttpStatus.NO_CONTENT)
  @DeleteMapping("{id}")
  @Transactional(rollbackFor = Exception.class)
  public void delete(@PathVariable("id") String id) {
    delete${moduleName}Port.deleteById(id);
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/Search${moduleName}Controller.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.GroupSearch${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.Search${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.Simple${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Search${moduleName}Port;
import com.bosonit.staffit.shared.ObjectFiller;
import com.bosonit.staffit.shared.dto.GroupSearchInputValueDTO;
import com.bosonit.staffit.shared.dto.PagedListDTO;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@Api(tags = "${moduleName}", description = "${moduleName} endpoints")
@RequestMapping("api/v0/${moduleNameToCamelCase}s")
public class Search${moduleName}Controller {

  private Search${moduleName}Port search${moduleName}Port;

  @PreAuthorize("hasPermission('hasAccess','${microserviceLowerCase.toUpperCase()}')")
  @GetMapping("search")
  @Transactional(rollbackFor = Exception.class)
  public PagedListDTO<Simple${moduleName}OutputDTO> search(
      Search${moduleName}InputDTO search${moduleName}InputDto,
      @RequestParam(name = "style", defaultValue = "simple") String style,
      @RequestParam(name = "order", defaultValue = "desc") String order,
      @RequestParam(name = "orderField", defaultValue = "") String orderField,
      @RequestParam(name = "page", defaultValue = "0") int page,
      @RequestParam(name = "size", defaultValue = "10") int size) {
    Search${moduleName} search${moduleName} =
        search${moduleName}InputDto.search${moduleName}();
    Page<${moduleName}> ${moduleNameLowerCase}s =
        search${moduleName}Port.search(search${moduleName}, page, size, order, orderField);
    List<Simple${moduleName}OutputDTO> ${moduleNameToCamelCase}OutputDTOS =
        ${moduleNameLowerCase}s.getContent().stream()
            .map(${moduleNameToCamelCase} -> getDTO(${moduleNameToCamelCase}, style))
            .collect(Collectors.toList());
    return new PagedListDTO(
        ${moduleNameToCamelCase}OutputDTOS,
        ${moduleNameLowerCase}s.getTotalElements(),
        ${moduleNameLowerCase}s.getTotalPages());
  }

  private Simple${moduleName}OutputDTO getDTO(${moduleName} ${moduleNameToCamelCase}, String style) {
    return style.equals("simple")
        ? new Simple${moduleName}OutputDTO(${moduleNameToCamelCase})
        : new ${moduleName}OutputDTO(${moduleNameToCamelCase});
  }


  @PreAuthorize("hasPermission('hasAccess','${microserviceLowerCase.toUpperCase()}')")
  @PostMapping("search/group")
  @Transactional(rollbackFor = Exception.class, readOnly = true)
  public Map<String, PagedListDTO<Simple${moduleName}OutputDTO>> search(
      @RequestParam(name = "key") String key,
      @Valid @RequestBody GroupSearch${moduleName}InputDTO groupSearch${moduleName}InputDTO)
      throws IllegalAccessException {
    Search${moduleName}InputDTO filters = groupSearch${moduleName}InputDTO.getFilters();
    Map<String, GroupSearchInputValueDTO> groups = groupSearch${moduleName}InputDTO.getGroups();
    Map<String, PagedListDTO<Simple${moduleName}OutputDTO>> results = new HashMap<>();
    for (Map.Entry<String, GroupSearchInputValueDTO> entry : groups.entrySet()) {
      String keyValue = entry.getKey();
      new ObjectFiller().replace(filters, key, keyValue);
      GroupSearchInputValueDTO groupSearchInputValueDTO = entry.getValue();
      String style = groupSearchInputValueDTO.getStyle();
      String order = groupSearchInputValueDTO.getOrder();
      String orderField = groupSearchInputValueDTO.getOrderField();
      int page = groupSearchInputValueDTO.getPage();
      int size = groupSearchInputValueDTO.getSize();
      PagedListDTO<Simple${moduleName}OutputDTO> searchResult =
          this.search(filters, style, order, orderField, page, size);
      results.put(keyValue, searchResult);
    }
    return results;
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/Find${moduleName}Controller.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.Simple${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Find${moduleName}Port;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@Api(tags = "${moduleName}", description = "${moduleName} endpoints")
@RequestMapping("api/v0/${moduleNameToCamelCase}s")
public class Find${moduleName}Controller {

  private Find${moduleName}Port find${moduleName}Port;

  @GetMapping("{id}")
  @Transactional(rollbackFor = Exception.class, readOnly = true)
  public Simple${moduleName}OutputDTO findById(
      @RequestParam(name = "style", defaultValue = "full") String style,
      @PathVariable("id") String id)
      throws Exception {
    ${moduleName} actual${moduleName} = find${moduleName}Port.findById(id);
    return getDTO(actual${moduleName}, style);
  }

  private Simple${moduleName}OutputDTO getDTO(${moduleName} ${moduleNameToCamelCase}, String style) {
    return style.equals("simple")
        ? new Simple${moduleName}OutputDTO(${moduleNameToCamelCase})
        : new ${moduleName}OutputDTO(${moduleNameToCamelCase});
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/Update${moduleName}Controller.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.application.port.Update${moduleName}Port;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output.Simple${moduleName}OutputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Find${moduleName}Port;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@Api(tags = "${moduleName}", description = "${moduleName} endpoints")
@RequestMapping("api/v0/${moduleNameToCamelCase}s")
public class Update${moduleName}Controller {

  private Update${moduleName}Port update${moduleName}Port;
  private Find${moduleName}Port find${moduleName}Port;

  @PutMapping("{id}")
  @Transactional(rollbackFor = Exception.class)
  public Simple${moduleName}OutputDTO update(
      @RequestParam(name = "style", defaultValue = "full") String style,
      @PathVariable("id") String id,
      @RequestBody ${moduleName}InputDTO ${moduleNameToCamelCase}InputDTO)
      throws Exception {
    ${moduleName} actual${moduleName} = find${moduleName}Port.findById(id);
    Save${moduleName} save${moduleName} =
        ${moduleNameToCamelCase}InputDTO.${moduleNameToCamelCase}(new Save${moduleName}(actual${moduleName}));
    ${moduleName} updated${moduleName} =
        update${moduleName}Port.update(id, save${moduleName});
    return getDTO(updated${moduleName}, style);
  }

  private Simple${moduleName}OutputDTO getDTO(${moduleName} ${moduleNameToCamelCase}, String style) {
    return style.equals("simple")
        ? new Simple${moduleName}OutputDTO(${moduleNameToCamelCase})
        : new ${moduleName}OutputDTO(${moduleNameToCamelCase});
  }
}

`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/jpa/${moduleName}RepositoryJpa.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.jpa;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName}Jpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ${moduleName}RepositoryJpa extends JpaRepository<${moduleName}Jpa, String> {
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/port/Delete${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port;

public interface Delete${moduleName}Port {
  void deleteById(String id);
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/port/Find${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};

import java.util.List;

public interface Find${moduleName}Port {
    ${moduleName} findById(String id) throws Exception;
}
`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/port/Save${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port;


import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};

public interface Save${moduleName}Port {
    ${moduleName} save(Save${moduleName} save${moduleName}) throws Exception;
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/port/Search${moduleName}Port.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import org.springframework.data.domain.Page;

public interface Search${moduleName}Port {
    Page<${moduleName}> search(Search${moduleName} search${moduleName}, int page, int size, String order, String orderField);
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/Delete${moduleName}Repository.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.jpa.${moduleName}RepositoryJpa;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Delete${moduleName}Port;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class Delete${moduleName}Repository implements Delete${moduleName}Port {
  private ${moduleName}RepositoryJpa ${moduleNameToCamelCase}RepositoryJpa;

  @Override
  public void deleteById(String id) {
    ${moduleNameToCamelCase}RepositoryJpa.deleteById(id);
  }
}
`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/Find${moduleName}Repository.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName}Jpa;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.jpa.${moduleName}RepositoryJpa;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Find${moduleName}Port;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class Find${moduleName}Repository implements Find${moduleName}Port {

  private ${moduleName}RepositoryJpa ${moduleNameToCamelCase}RepositoryJpa;

  @Override
  public ${moduleName} findById(String id) throws Exception {
    ${moduleName}Jpa ${moduleNameToCamelCase}Jpa =
        ${moduleNameToCamelCase}RepositoryJpa
            .findById(id)
            .orElseThrow(
                () -> new Exception("${moduleName} not found with id: " + id));
    return new ${moduleName}(${moduleNameToCamelCase}Jpa);
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/Save${moduleName}Repository.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName}Jpa;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.jpa.${moduleName}RepositoryJpa;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Save${moduleName}Port;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class Save${moduleName}Repository implements Save${moduleName}Port {

  private ${moduleName}RepositoryJpa ${moduleNameToCamelCase}RepositoryJpa;

  @Override
  public ${moduleName} save(Save${moduleName} save${moduleName}) throws Exception {
    ${moduleName}Jpa ${moduleNameToCamelCase}Jpa = new ${moduleName}Jpa(save${moduleName});
    ${moduleNameToCamelCase}RepositoryJpa.save(${moduleNameToCamelCase}Jpa);
    return new ${moduleName}(${moduleNameToCamelCase}Jpa);
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/repository/Search${moduleName}Repository.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName}Jpa;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.repository.port.Search${moduleName}Port;
import com.bosonit.staffit.shared.SearchReflections;
import com.bosonit.staffit.shared.SearchUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class Search${moduleName}Repository implements Search${moduleName}Port {

  private EntityManager entityManager;

  @Override
  public Page<${moduleName}> search(
      Search${moduleName} search${moduleName},
      int page,
      int size,
      String order,
      String orderField) {
    // builders
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<${moduleName}Jpa> criteriaQuery =
        criteriaBuilder.createQuery(${moduleName}Jpa.class);
    CriteriaQuery<Long> criteriaQueryCount = criteriaBuilder.createQuery(Long.class);

    // select
    List<Predicate> prs = new ArrayList<>();
    Root<${moduleName}Jpa> root = tmp(criteriaBuilder, criteriaQuery, prs, search${moduleName});

    String orderByField = "id"; // default orderField
    if (doesContainsField(orderField)) orderByField = orderField; // correct orderField

    if (order == null || order.isEmpty()) // default order desc
    criteriaQuery.orderBy(criteriaBuilder.desc(root.get(orderByField)));
    if (order != null && order.equals("asc")) // order asc
    criteriaQuery.orderBy(criteriaBuilder.asc(root.get(orderByField)));
    if (order != null && order.equals("desc")) // order desc
    criteriaQuery.orderBy(criteriaBuilder.desc(root.get(orderByField)));

    criteriaQuery.select(root).where(prs.toArray(new Predicate[] {}));
    List<${moduleName}Jpa> ${moduleNameToCamelCase}Jpas =
        entityManager
            .createQuery(criteriaQuery)
            .setFirstResult(page * size)
            .setMaxResults(size)
            .getResultList();

    // count
    Root<${moduleName}Jpa> rootCount =
        tmp(criteriaBuilder, criteriaQueryCount, prs, search${moduleName});
    criteriaQueryCount
        .select(criteriaBuilder.count(rootCount))
        .where(prs.toArray(new Predicate[] {}));
    long maxResults = entityManager.createQuery(criteriaQueryCount).getSingleResult();

    // return
    List<${moduleName}> ${moduleNameToCamelCase}s =
        ${moduleNameToCamelCase}Jpas.stream().map(${moduleName}::new).collect(Collectors.toList());
    return new PageImpl<>(${moduleNameToCamelCase}s, PageRequest.of(page, size), maxResults);
  }

  private Boolean doesContainsField(String orderBy) {
    if (orderBy == null || orderBy.isEmpty()) return false;
    Field[] fields = ${moduleName}Jpa.class.getDeclaredFields();
    for (Field field : fields) {
      if (field.getName().equals(orderBy)) return true;
    }
    return false;
  }

  private Root<${moduleName}Jpa> tmp(
      CriteriaBuilder cb,
      CriteriaQuery<?> cq,
      List<Predicate> prs,
      Search${moduleName} search${moduleName}) {

    // root
    Root<${moduleName}Jpa> root = cq.from(${moduleName}Jpa.class);

    // wheres
    SearchReflections<${moduleName}Jpa, Search${moduleName}> search = new SearchReflections<>();
    List<String> ignore = List.of("");
    List<String> equals = List.of("");
    search.reflectionsSearch(root, cb, prs, search${moduleName}, equals, ignore);

    return root;
  }
}

`);